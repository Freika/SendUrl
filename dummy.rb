require 'sinatra'
post '/' do
  puts params['url']
end
