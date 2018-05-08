require 'yaml'

class HomeController < ApplicationController
  def index
    drive = GoogleDrive.new

    files = drive.drive_service.list_files
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

    drive.drive_service.get_file(data_file_id, download_dest: 'tmp/babble-data.yml')
    @data = YAML.load_file('tmp/babble-data.yml')

    render react_component: 'Home', props: { name: 'a component rendered from a controller', data: JSON.parse(@data.to_json) }
  end
end
