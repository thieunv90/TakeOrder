class Api::V1::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  def create
    user = User.new(params[:user])
    if user.save
      if params[:position] == "employee"
        user.add_role :employee
      elsif params[:position] == "chef"
        user.add_role :chef
      end
      render :json => {
        :success => true,
        :user_id => user.id,
        :username => user.username,
        :role_name => user.roles.first.name
      }
      return
    else
      warden.custom_failure!
      render :json => user.errors, :status => 422
    end
  end
end
