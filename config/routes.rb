Rails.application.routes.draw do
  devise_for :users
  root to: 'home#index'
  post '/save_history', to: 'home#save'
end
