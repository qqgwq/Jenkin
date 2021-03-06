class CommentsController < ApplicationController
  before_action :find_comment, only: [:show, :destroy, :edit, :update]
  before_action :require_login, only: [:create, :destroy, :new]

  def create
    #binding.pry
    @article = Article.find(params[:article_id])
    @comment = @article.comments.create params.require(:comment).permit(:content).merge(user: current_user)
    respond_to do |format|
      if @comment.save
        @comment.article.last_username = @comment.user.name #赋值给article.last_name
        @comment.article.created_at = @comment.created_at
        @comment.article.save
        #创建发布评论用户通知
        if current_user != @article.user
          Notification.create!(
            user: @article.user,
            subject_id: @comment.id, #发布评论的id
            subject_type: 'Comment',
            read: false
          )
        else
          #回复评论通知
          @comment = Comment.find_by(params[:comment][:comment_id]) #查询提交表单的comment.id
          if current_user.id != @comment.user #取hiddle_field中的值
            Notification.create!(
              user: @comment.user,
              subject_id: @comment.id,
              subject_type: 'Comment',
              read: false)
          end
        end
        format.html {redirect_to article_path(@article)}
        format.js { flash[:success] = "添加评论成功" }
      else
        format.html {render 'new'}
        format.js
      end
    end
  end

  def show
  end

  def edit
  end

  def update
    if @comment.update params.require(:comment).permit(:content)
      redirect_to article_path(@article)
    else
      render 'edit'
    end
  end

  def destroy
    @comment.update(is_deleted: true)
    @comment.is_deleted
    respond_to do |format|
      format.html {redirect_to article_path(@article)}
      format.js { flash[:success] = "删除成功" }
    end
  end

  def preview
    @content = params[:content]
    render layout: false
  end


  private

  def find_comment
    @article = Article.find(params[:article_id])
    @comment = @article.comments.find(params[:id])
  end
end
