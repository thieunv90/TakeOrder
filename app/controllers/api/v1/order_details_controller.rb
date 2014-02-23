class Api::V1::OrderDetailsController < Api::V1::ApiController
  respond_to :json
  def index
    tmp_list_foods_ordered_today = []
    total_money_today = 0
    list_orders_today = OrderDetail.where(is_ordered: true).where('date = ?', DateTime.now.strftime("%Y-%m-%d").to_s).group_by(&:food_id)
    if !list_orders_today.blank?
      list_orders_today.each do |food_id, value|
        food = Food.find(food_id)
        tmp = {}
        tmp[:quantity] = value.collect{|order| order.quantity}.sum
        tmp[:name] = food.name
        tmp[:total_cost] = value.collect{|order| order.total_cost}.sum
        total_money_today = total_money_today + tmp[:total_cost]
        tmp_list_foods_ordered_today << tmp
      end
    end
    render :json => {sum_money: total_money_today, orders: tmp_list_foods_ordered_today}
  end
  def checkout
    table = Table.find(params[:table_id])
    table.order_details.where(is_ordered: false).update_all(is_ordered: true)
    table.status = 1
    table.save
    render :json => {success: true}
  end
  def create
    check_save = true
    table = Table.find_by_id(params[:table_id].to_i)
    params[:drinkdishes].each_with_index do |id, index|
      order = OrderDetail.new(food_id: id.to_i, quantity: params[:quantities][index].to_i, total_cost: params[:prices][index].to_i, table_id: params[:table_id].to_i, user_id: params[:person_id].to_i, date: DateTime.now.strftime("%Y-%m-%d").to_s)
      if order.save
        check_save = true
      else
        check_save = false
      end
    end
    table.update_attributes(status: 2) if check_save && table
    render :json => {success: check_save}
  end
end
