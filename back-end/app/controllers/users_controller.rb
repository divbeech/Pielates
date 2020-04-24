class UsersController < ApplicationController

    def index
        @users = User.all
        render json: @users
      end
    
      def show
        @user = User.find(params[:id])
        render json: @user
      end
    
      def create
        @user = User.new(user_params)
        if @user.save
          jwt = encode_token({user_id: @user.id})
          render json: {user: UserSerializer.new(@user), jwt: jwt}
        else
          puts 'bad request'
        end
      end
    
      def update
        @user = User.find(params[:id])
        @user.update(user_params)
        render json: @user
      end
    
      def destroy
        @user = User.find(params[:id])
        @user.destroy
        render json: @user
      end
    
      private
    
      def user_params
        params.permit(:name, :age, :username, :password_digest)
      end
    

end