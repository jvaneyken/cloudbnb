class User < ApplicationRecord
  has_secure_password

  validates :username,
    presence: true,
    length: { in: 3...30 },
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email,
    presence: true,
    uniqueness: true, length: { in: 3..255 },
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token,
    presence: true,
    uniqueness: true
  validates :password,
    length: { in: 6..255 },
    allow_nil: true

  has_many :reservations,
    dependent: :destroy

  has_many :reviews,
    foreign_key: :user_id,
    dependent: :destroy,
    inverse_of: :user

  has_many :wishlists,
    foreign_key: :user_id,
    dependent: :destroy

  before_validation :ensure_session_token

  def self.find_by_credentials(credential, password)
    field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
    user = User.find_by(field => credential)
    user&.authenticate(password)
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end

  def generate_unique_session_token
    loop do
      token = SecureRandom.base64
      break token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

end
