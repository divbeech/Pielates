class FavoritesController < ApplicationController
    class FavoritesController < ApplicationController

        def index
          @favorites = Favorite.all
          render json: @favorites
        end
      
        def show 
          render json: @user
        end
      
        def create
          if logged_in
            place = Membership.find(params[:membership_id])
            user = current_person
            @favorite = Favorite.create(place: place, user: user)
            if @favorite
              render json: {id: place[:id], name: place[:name]}
            else
              render json: { errors: @favorite.errors.full_messages }
            end
          else
            render json: { errors: "User not logged in" }
          end
        end
      
        def destroy
          @favorite = Membership.find(params[:id])
          @favorite.destroy
          render json: @favorite
        end
      
      
      end
end