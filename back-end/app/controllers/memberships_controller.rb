class MembershipsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        membership = Membership.create(user_id: params[:user_id], name: params[:name], yelp_id: params[:yelp_id], image: params[:image], address: params[:address], phone: params[:phone])

       memberships = Membership.all

        render json: memberships
    end

    def index

        memberships = Membership.all
        render json: memberships

    end

    def destroy
        Membership.find(params[:id]).destroy
        memberships = Membership.all

        render json: memberships
    end

end