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
        post "/sign_up", :to => 'registrations#create'
      end

      resources :tables do
        collection do
          get 'waiter'
          get 'chef_cook'
          get 'shop_manager'
        end
        member do
          post 'update_status'
        end
      end

      resources :foods do
        collection do
          get 'waiter'
          get 'ordered'
        end
      end

      resources :order_details do
        collection do
          get 'checkout'
        end
      end

      resources :users
    end
  end
end
