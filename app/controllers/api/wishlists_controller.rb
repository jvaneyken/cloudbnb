class Api::WishlistsController < ApplicationController

    before_action :require_logged_in

    def index
        @wishlists = Wishlist.where(user_id: current_user.id)
        render :index
    end

    def create
        @wishlist = Wishlist.new(wishlist_params)
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

    def wishlist_params
        params.require(:wishlist).permit(:id, :listing_id, :user_id)
    end

end
