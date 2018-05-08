require 'googleauth'
require 'googleauth/web_user_authorizer'
require 'googleauth/stores/redis_token_store'
require 'google/apis/drive_v3'
require 'redis'

class GoogleDrive
  attr_accessor :drive_service
  def initialize
    scope = 'https://www.googleapis.com/auth/drive'

    authorizer = Google::Auth::ServiceAccountCredentials.make_creds(
      json_key_io: StringIO.new(ENV["BABBLE_GCLOUD_CREDS"]),
      scope: scope)

    authorizer.fetch_access_token!
    drive = Google::Apis::DriveV3::DriveService.new
    drive.authorization = authorizer

    @drive_service = drive
  end
end
