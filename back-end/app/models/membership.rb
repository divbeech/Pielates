class Membership < ApplicationRecord
    belongs_to :user, :foreign_key => "user_id"
    belongs_to :studio, :foreign_key => "studio_id"
end
