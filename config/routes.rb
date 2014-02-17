TakeOrder::Application.routes.draw do
  # get "registrations/create"

  # get "sessions/create"

  # get "sessions/destroy"

  namespace :api do
    namespace :v1 do
      devise_for :users
      devise_scope :user do
        post "/sign_in", :to => 'sessions#create'
        delete "/sign_out", :to => 'sessions#destroy'
      end
    end
  end
end
