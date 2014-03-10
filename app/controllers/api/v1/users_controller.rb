class Api::V1::UsersController < Api::V1::ApiController
  respond_to :json
  def index
    list_users = User.all
    tmp_list_users = []
    list_users.each do |user|
      tmp = user.attributes
      tmp[:role_name] = user.roles ? user.roles.first.name : 'employee'
      tmp_list_users << tmp
    end
    render :json => tmp_list_users.to_json
  end
  def edit
    user = User.find(params[:id])
    tmp_user = user.attributes
    tmp_user[:role_name] = user.roles.first.name
    render :json => tmp_user.to_json
  end
end
