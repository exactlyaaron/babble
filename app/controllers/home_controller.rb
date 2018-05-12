require 'yaml'

class HomeController < ApplicationController
  def index
    drive = GoogleDrive.new

    filename = 'babble-data.yml'
    if current_user.email != 'thecodyhoosier@gmail.com'
      filename = 'babble-data-demo.yml'
    end
    drive.download_file(filename, 'tmp/babble-data.yml')
    @data = YAML.load_file('tmp/babble-data.yml')

    history_filename = 'babble-history.json'
    drive.download_file(history_filename, 'tmp/babble-history.json')

    @history_data = File.read('tmp/babble-history.json')

    if @history_data.size == 0
      @history_data = '{}'
    end

    render react_component: 'Home', props: { name: 'a component rendered from a controller', data: JSON.parse(@data.to_json), user: current_user, history: JSON.parse(@history_data) }
  end

  def save
    # write file with history and post to drive
    File.open("tmp/babble-history.json","w") do |f|
      f.write(params['historyObj'].to_json)
    end
    file_metadata = {name: 'babble-history.json'}
    file = drive.drive_service.create_file(file_metadata,
                                           fields: 'id',
                                           upload_source: 'tmp/babble-history.json',
                                           content_type: 'text/json')

    render json: {history_file_id: file.id}.to_json
  end
end
