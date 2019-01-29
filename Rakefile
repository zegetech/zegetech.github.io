require "html-proofer"

desc "Test resulting site"
task :test do
sh "bundle exec jekyll build"
  options = {
      :empty_alt_ignore => true,:allow_hash_href => true,
      :extension => ".html", :disable_external => true,
      :parallel => { :in_processes => 3},
      :url_ignore => ["/blog.html"],
    
  }
HTMLProofer.check_directory("./_site", options).run
end

