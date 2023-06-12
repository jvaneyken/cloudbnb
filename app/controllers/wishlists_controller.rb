class WishlistsController < ApplicationController

    before_action :require_logged_in

    def index
        @wishlists = Wishlist.where(user_id: current_user.id)
        render :index
    end

    def create
        @wishlist = Wishlist.new(wishlists_params)
        if @wishlist.save
            render :show
        else
            render json: {errors: @wishlist.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @wishlist = Wishlist.find(params[:id])
        @wishlist.destroy
        render :show
    end

    private

    def wishlists_params
        params.require(:wishlists).permit(:id, :listing_id, :user_id)
    end

end
