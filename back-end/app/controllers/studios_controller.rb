class StudiodController < ApplicationController
  require 'json'
  require 'http'
  require 'cgi'
  skip_before_action :verify_authenticity_token
  
  API_HOST = "https://api.yelp.com"
  SEARCH_PATH = "/v3/businesses/search"
  BUSINESS_PATH = "/v3/businesses/"  
  API_KEY = "G_PWYa8GG2Q4Y59ZLAd0h39jIFv2rEZrSpuknRR2JGb3zyZxwFtIxKFSQslforqbIWvcyz61nz3csWzXtpot2DKS01WKbNIBFy-z1yn7Wsm1pwKD3TnoC4PkjHGoXnYx"
  SEARCH_LIMIT=12
  def search
      search_term = params[:search_term]
      search_location = params[:location]

      response = RestClient::Request.execute(
          method: "GET",
          url: "#{API_HOST}#{SEARCH_PATH}?location=#{search_location}&term=#{search_term}&limit=#{SEARCH_LIMIT}", 
          headers: {
              Authorization: "Bearer #{API_KEY}"
          }
      )
      results = JSON.parse(response)
      render json: results
  end

  def lookup
      business_id = params[:business_id]

      detail_response = RestClient::Request.execute(
          method: "GET",
          url: "#{API_HOST}#{BUSINESS_PATH}#{business_id}", 
          headers: {
              Authorization: "Bearer #{API_KEY}"
          }
      )
      detail_result = JSON.parse(detail_response)

      review_response = RestClient::Request.execute(
          method: "GET",
          url: "#{API_HOST}#{BUSINESS_PATH}#{business_id}/reviews", 
          headers: {
              Authorization: "Bearer #{API_KEY}"
          }
      )
      review_result = JSON.parse(review_response)
      render json: {details: detail_result, reviews: review_result}
  end

 
end