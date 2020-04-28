class UsersController < ApplicationController

  def index
      users = User.all
      user = users.find do |user|
          user.username == params[:username]
      end
      if !user
          user = User.first
      end
      user_memberships = user.memberships
      render json: {users: users, user: user, memberships: user_memberships}
  end

  def show
      user = User.find_by(params[:id])
      render json: user
  end

  def create
      user = User.create(username: params[:username], age: params[:age], name: params[:name], password_digest: params[:password_digest])
      render json: user
  end

end