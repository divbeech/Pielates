Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, :studios, :memberships
  post '/search', to: 'studios#search'
  post '/lookup', to: 'studios#lookup'
end
