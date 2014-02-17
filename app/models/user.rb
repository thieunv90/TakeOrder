class User < ActiveRecord::Base
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  attr_accessible :username, :email, :password, :password_confirmation, :remember_me

  validates :username, presence:true, length:{in: 2..256}

  def email_required?
    false
  end

  def email_changed?
    false
  end
end
