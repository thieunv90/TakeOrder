class Api::V1::TablesController < Api::V1::ApiController
  respond_to :json
  def index
    list_tables = Table.order(:name)
    render :json => list_tables.to_json
  end
  def create
    table = Table.new(params[:table])
    if table.save
      render :json => {success: true, table: table}
    else
      render :json => {success: false}
    end
  end
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
