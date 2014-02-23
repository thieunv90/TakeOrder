class Api::V1::TablesController < Api::V1::ApiController
  respond_to :json
  def waiter
    render :json => Table.order(:id).each_slice(2).to_json
  end
  def chef_cook
    render :json => Table.where(status: 2).order(:id).to_json
  end
  def update
    table = Table.find(params[:id])
    table.status = 3
    if table.save
      check_save = true
    else
      check_save = false
    end
    render :json => {success: check_save}
  end
  def update_status
    table = Table.find(params[:id])
    table.status = params[:status]
    if table.save
      check_save = true
    else
      check_save = false
    end
    render :json => {success: check_save}
  end
end
