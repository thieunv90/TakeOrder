class Api::V1::FoodsController < Api::V1::ApiController
  respond_to :json
  def waiter
    render :json => Food.all.to_json
  end
  def ordered
    table = Table.find(params[:table_id])
    list_foods_ordered = table.order_details.where(is_ordered: false)
    tmp_list_foods_ordered = []
    list_foods_ordered.each do |order_detail|
      food = Food.find(order_detail.food_id)
      tmp = order_detail.attributes
      tmp[:food_name] = food.name
      tmp[:unit_price] = food.price
      tmp_list_foods_ordered << tmp
    end
    list_foods_ordered = tmp_list_foods_ordered
    render :json => list_foods_ordered
  end
end
