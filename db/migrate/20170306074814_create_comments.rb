class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.text :content
      t.belongs_to :article, foreign_key: true
      t.belongs_to :user, foreign_key: true
      t.integer :notification_id
      t.string :image
      t.timestamps
    end
  end
end
