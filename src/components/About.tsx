

export function About() {
    return (
        <div className={"terminal-card"}>
          <header>FAQ</header>
          <div className="card-body">
            <strong>What is this? What am I trying to do?</strong>
            <p>
              The image is a representation of a finite state machine. The aim
              is to craft a regular expression that will match the state
              machine.
            </p>
            <p>
              These should start at the left hand side, and should only be valid
              if they terminate at a double circle.
            </p>

            <strong>Why am I trying to do this?</strong>
            <p>
              Well, because they've vaguely reassuring somehow. Let me know if
              you work out how they pull this off
            </p>

            <strong>What's the benefit of this page?</strong>
            <p>
              <a href="https://bsky.app/profile/dochne.com/post/3lcofm32b4k2f">
                It can be tricky
              </a>{" "}
              not to screw it up - so it's nice to have an easy way to write a
              test suite
            </p>

            <strong>How can I use it?</strong>
            <p>
              Add example patterns that should be valid to the valid box and
              invalid to the invalid and start writing your regex!
            </p>

            <strong>...uch, this isn't PCRE!</strong>
            <p>That's not a question!</p>

            <strong>Who runs vaguely reassuring state machines?</strong>
            <p>
              <a href="https://bsky.app/profile/katef.bsky.social">Kate!</a>
            </p>

            <strong>Who made this page?</strong>
            <p>
              I'm <a href="https://bsky.app/profile/dochne.com">Doug</a>!
            </p>
          </div>
        </div>
    )
}