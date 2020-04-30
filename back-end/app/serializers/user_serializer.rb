class UserSerializer < ActiveModel::Serializer
  attributes :id, :age, :name, :username 
  has_many :memberships
  has_many :studios, through: :memberships

end
