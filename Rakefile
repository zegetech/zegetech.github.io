require "html-proofer"

desc "Test resulting site"
task :test do
  sh "bundle exec jekyll build  --future --unpublished"
  options = {
    empty_alt_ignore: true, 
    allow_hash_href: true,
    extension: ".html",  
    only_4xx: true,
    parallel: { in_processes: 3}
  }
  HTMLProofer.check_directory("./_site", options).run
end

