class Api::ReviewsController < ApplicationController

    before_action :require_logged_in
    wrap_parameters include: Review.attribute_names + [:listingId, :userId]

    def create
        @review = current_user.reviews.new(review_params)
        if @review.save
            render :show
        else
            render json: {errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
        @reviews = Review.where(user_id: current_user.id)
        render :index
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
        params.require(:reviews).permit(:body, :rating, :listing_id)
    end

end
