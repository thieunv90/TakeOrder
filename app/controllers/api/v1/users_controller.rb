class Api::V1::UsersController < Api::V1::ApiController
  respond_to :json
  def index
    list_users = User.all
    tmp_list_users = []
    list_users.each do |user|
      tmp = user.attributes
      tmp[:role_name] = user.roles.first.name
      tmp_list_users << tmp
    end
    render :json => tmp_list_users.to_json
  end
end
