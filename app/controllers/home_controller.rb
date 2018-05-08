require 'yaml'
require 'googleauth'
require 'googleauth/web_user_authorizer'
require 'googleauth/stores/redis_token_store'
require 'redis'

require 'google/apis/drive_v3'

class HomeController < ApplicationController
  def index
    scope = 'https://www.googleapis.com/auth/drive'

    authorizer = Google::Auth::ServiceAccountCredentials.make_creds(
      json_key_io: StringIO.new(ENV["BABBLE_GCLOUD_CREDS"]),
      scope: scope)

    authorizer.fetch_access_token!
    drive = Google::Apis::DriveV3::DriveService.new
    drive.authorization = authorizer # See Googleauth or Signet libraries

    files = drive.list_files
    files_data = JSON.parse(files.to_json)
    filename = 'babble-data.yml'
    if current_user.email != 'thecodyhoosier@gmail.com'
      filename = 'babble-data-demo.yml'
    end
    data_file_id = nil
    files_data['files'].each do |f|
      if f['name'] == filename
        data_file_id = f['id']
      end
    end

    drive.get_file(data_file_id, download_dest: 'tmp/babble-data.yml')
    @data = YAML.load_file('tmp/babble-data.yml')

    render react_component: 'Home', props: { name: 'a component rendered from a controller', data: JSON.parse(@data.to_json) }
  end
end
