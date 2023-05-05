class Api::ReviewsController < ApplicationController

    # before_action :require_logged_in, only: [create, update, destroy]
    wrap_parameters include: Review.attribute_names + [:listingId, :userId]

    def create
        @review = current_user.reviews.new(review_params)
        # @review = Review.new(review_params)
        if @review.save
            render :show
        else
            render json: {errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
        @reviews = Review.all
        render :index
    end

    def show
        @review = Review.find_by(id: params[:id])
        if @review
            render :show
        else
            render json: {errors: @review.errors.full_messages }, status: unprocessable_entity
        end
    end

    def update
        @review = Review.find_by(id: params[:id])
        if @review&.update(review_params)
            render :show
        else
            render json: {errors: @review.errors.full_messages }
        end
    end

    def destroy
        @review = Review.find(params[:id])
        @review.destroy
        render :show
    end

    private

    def review_params
        params.require(:review).permit(:id, :created_at, :username, :user_id, :body, :rating, :listing_id)
    end

end
