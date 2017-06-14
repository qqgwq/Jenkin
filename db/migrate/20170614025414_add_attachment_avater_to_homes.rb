class AddAttachmentAvaterToHomes < ActiveRecord::Migration
  def self.up
    change_table :homes do |t|
      t.attachment :avater
    end
  end

  def self.down
    remove_attachment :homes, :avater
  end
end
