Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"


  namespace :api, defaults: { format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:show, :create, :destroy]
    # resources :listings, only: [:index]
    # resources :reservations
    # resources :locations, only: [:index]
    # resources :reviews
  end

  get '*path', to: 'static_pages#frontend'

end
