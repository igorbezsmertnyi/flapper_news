class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.string :body
      t.string :author

      t.integer :upvotes, default: 0
      t.references :post, foreign_key: true

      t.timestamps
    end
  end
end
