class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :link
      t.integer :upvotes, default: 0
      t.string :username

      t.timestamps
    end
  end
end
