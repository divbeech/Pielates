class User < ApplicationRecord
    has_many :memberships
    has_many :studios, through: :memberships
    
end
