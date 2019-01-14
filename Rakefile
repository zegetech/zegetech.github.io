require "html-proofer"

desc "Test resulting site"
task :test do
sh "bundle exec jekyll build"
  options = {
      :empty_alt_ignore => true, :http_status_ignore =>["999","302"
      ], :allow_hash_href => true,
      :extension => ".htm", 
      :parallel => { :in_processes => 3}
  }
HTMLProofer.check_directory("./_site", options).run
end

