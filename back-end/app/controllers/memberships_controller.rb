class MembershipsController < ApplicationController

    def index
      @memberships = Memberships.all
      render json: @memberships
    end
  
    def show
      @membership = Membership.find(params[:id])
      render json: @membership
    end
  
    def create
      @membership = Membership.create(membership_params)
      render json: @membership
    end
  
    def update
      @membership = Membership.find(params[:id])
      @membership.update(membership_params)
      render json: @membership
    end
  
    def destroy
      @membership = Membership.find(params[:id])
      @membership.destroy
      render json: @membership
    end
  
    private
  
    def membership_params
      params.require(:membership.permit(:studio_id, :user_id, :favorite)
    end
  
  end