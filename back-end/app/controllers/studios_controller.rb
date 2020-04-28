
  def index
    @studios = Studio.all
    render json: @studios
  end

  def show
    @studio = Studio.find(params[:id])
    render json: @studio
  end

  def create
    @studio = Studio.create(studio_params)
    render json: @studio
  end

  def update
    @studio = Studio.find(params[:id])
    @studio.update(studio_params)
    render json: @studio
  end

  def destroy
    @studio = Studio.find(params[:id])
    @studio.destroy
    render json: @studio
  end

  private

  def studio_params
    params.require(:studio).permit(:name, :image_url, :address, :latitude, :longitude, :rating, :reviews, :price, :url)
  end

end