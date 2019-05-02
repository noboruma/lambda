var child_process = require('child_process');

exports.handler = function(event, context) {
    // event is the JSON we provide to our lambda function. More on this later.
    console.log(event["email"]);

    // spawn a child process with our email-checker-linux binary and the event["email"] value for our argument.
    var proc = child_process.spawn('./email-checker', [ event["email"] ], { stdio: 'inherit' });

    proc.on('close', function(code) {
        if(code !== 0) {
            return context.done(new Error("Process exited with non-zero status code"));
        }

        context.done(null);
    });
}
