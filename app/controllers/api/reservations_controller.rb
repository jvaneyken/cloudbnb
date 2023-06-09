class Api::ReservationsController < ApplicationController

    before_action :require_logged_in

    def index
        @reservations = Reservation.where(user_id: current_user.id)
        render :index
    end

    def show
        @reservation = Reservation.find_by(id: params[:id])
        render :show
    end

    def create
        @reservation = Reservation.new(reservation_params)
        if @reservation.save
            render :show
        else
            render json: {errors: @reservation.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @reservation = Reservation.find_by(id: params[:id])
        if @reservation&.update(reservation_params)
            render :show
        else
            render json: {errors: @reservation.errors.full_messages }
        end

    end

    def destroy
        @reservation = Reservation.find(params[:id])
        @reservation.destroy
        render :show
    end

    private 

    def reservation_params
        params.require(:reservation).permit(:id, :heading, :user_id, :check_in_date, :check_out_date, :num_guests, :listing_id)
    end

end