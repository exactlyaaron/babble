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

  def download_file(filename, dest)
    files = self.drive_service.list_files
    files_data = JSON.parse(files.to_json)

    data_file_id = nil
    files_data['files'].each do |f|
      if f['name'] == filename
        data_file_id = f['id']
      end
    end

    if data_file_id
      self.drive_service.get_file(data_file_id, download_dest: dest)
    end
  end
end
