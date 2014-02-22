class Api::V1::SessionsController < Devise::SessionsController
  prepend_before_filter :require_no_authentication, :only => [:create ]

  before_filter :ensure_params_exist

  respond_to :json

  def create
    resource = User.find_for_database_authentication(:username => params[:user][:username])
    return invalid_login_attempt unless resource

    if resource.valid_password?(params[:user][:password])
      sign_in("user", resource)
      render :json => {
        :success => true,
        :user_id => resource.id,
        :username => resource.username,
        :role_name => resource.roles.first.name
      }
      return
    end
    invalid_login_attempt
  end

  def destroy
    sign_out(resource_name)
  end

  protected
  def ensure_params_exist
    return unless params[:user].blank?
    render :json => {:success => false, :message => "Missing user parameter"}, :status => 422
  end

  def invalid_login_attempt
    warden.custom_failure!
    render :json=> {:success => false, :message => "Error with your username or password"}, :status => 401
  end
end
