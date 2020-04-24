class MembershipsController < ApplicationController
    

    def index
       membership = Membership.all
        render json: memberships

    end

    def create
        @membership = Membership.find(params[:id])
        render json: @membership
    end

    def destroy
        Membership.find(params[:id]).destroy
        memberships = Membership.all
        render json: memberships
    end

    def membership_params
        params.permit(:user_id, :studio_id, :favorite)
      end


end