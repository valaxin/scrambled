# Scrambled Discord Bot Documentation

## Overview

Scrambled is a personal Discord bot built with Node.js, utilizing Discord.js for bot functionality and Express.js for a companion web server. The bot integrates with various services including Spotify, Twitch, and calendar systems to provide a comprehensive set of features for server management and entertainment.

## Architecture

### Core Components

- **Bot Client** (`bot/client.js`): Main Discord client setup, command and event loading
- **Web Server** (`server/app.js`): Express server with Socket.IO for real-time communication
- **Database**: MongoDB with Mongoose for data persistence
- **Commands**: Slash commands for user interactions
- **Events**: Discord event handlers
- **Helpers**: Utility functions for various integrations
- **Controllers**: API endpoints for external services
- **Daemons**: Background processes for continuous tasks

### Key Dependencies

- `discord.js`: Discord API wrapper
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `socket.io`: Real-time communication
- `axios`: HTTP client
- `node-ical`: Calendar parsing
- `node-cron`: Scheduled tasks

## Current Features

### Discord Commands

1. **/help**: Displays bot information (currently private/ephemeral)
2. **/content**: Media search with subcommands
   - `movie <query>`: Search for movies with streaming links
   - `series <query> <season> <episode>`: Search for TV episodes with streaming links
3. **/ftcreate**: Create forum threads manually

### Integrations

- **OMDB API**: Movie/TV database for content searches
- **Calendar Import**: iCal parsing for course/event management
- **Forum Management**: Automatic thread creation based on calendar events
- **Spotify**: Current track monitoring via OAuth
- **Twitch**: (Controller exists, functionality TBD)
- **System Monitoring**: Basic system information

### Web Server Endpoints

- `/spotify/nowplaying`: Get current Spotify track
- Token management and OAuth flows
- Support system (TBD)

## Current Issues & Tightening Opportunities

### Code Quality

1. **Error Handling**: Inconsistent error handling across files
   - Some commands lack proper try-catch blocks
   - API failures not gracefully handled in user-facing responses
   - Missing validation for user inputs

2. **Code Organization**:
   - Mixed ES modules and CommonJS patterns
   - Inconsistent file naming (some kebab-case, some camelCase)
   - Unused imports and variables
   - Hardcoded values that should be environment variables

3. **Security**:
   - API keys exposed in some areas
   - Missing input sanitization
   - No rate limiting on commands
   - Session management could be improved

4. **Performance**:
   - Synchronous operations blocking event loop
   - No caching for API responses
   - Large data structures loaded on startup

### Functionality Gaps

1. **Command Limitations**:
   - Help command is essentially non-functional
   - Limited user feedback for command execution
   - No command permissions beyond basic Discord permissions

2. **Integration Issues**:
   - Calendar integration only checks existing events, no creation
   - Media broker uses potentially unreliable streaming sources
   - Spotify integration lacks user-specific functionality

## Expansion Ideas

### New Commands

1. **Music Commands**:
   - `/nowplaying`: Show current Spotify track in chat
   - `/queue`: Display upcoming tracks
   - `/lyrics`: Fetch lyrics for current song

2. **Calendar Commands**:
   - `/schedule`: Display upcoming events
   - `/remind`: Set personal reminders
   - `/courses`: List current courses with details

3. **Moderation Commands**:
   - `/warn`: Issue warnings to users
   - `/timeout`: Temporary mute functionality
   - `/poll`: Create polls in channels

4. **Utility Commands**:
   - `/weather`: Weather information
   - `/translate`: Language translation
   - `/calc`: Simple calculator

### Enhanced Features

1. **User Profiles**:
   - Store user preferences in database
   - Personalized recommendations
   - Activity tracking

2. **Advanced Media**:
   - Multiple streaming source options
   - Quality selection
   - Download links (where legal)

3. **Automation**:
   - Scheduled announcements
   - Auto-moderation rules
   - Welcome messages with roles

4. **Web Dashboard**:
   - Bot management interface
   - Analytics and usage statistics
   - Configuration panel

### Integration Expansions

1. **Additional Services**:
   - YouTube API for video content
   - GitHub integration for repository monitoring
   - Steam/Twitch game status
   - RSS feed monitoring

2. **Database Enhancements**:
   - User statistics and analytics
   - Command usage tracking
   - Audit logs for moderation actions

3. **Real-time Features**:
   - Live status updates via Socket.IO
   - Real-time notifications
   - Collaborative features

## Implementation Roadmap

### Phase 1: Tightening (High Priority)

1. Implement consistent error handling
2. Add input validation and sanitization
3. Move all hardcoded values to environment variables
4. Add logging system
5. Implement rate limiting
6. Clean up unused code and dependencies

### Phase 2: Core Improvements (Medium Priority)

1. Enhance help command with actual documentation
2. Add command cooldowns and permissions
3. Implement caching for API responses
4. Add database models for users and settings
5. Improve calendar integration with event creation

### Phase 3: New Features (Lower Priority)

1. Implement music-related commands
2. Add moderation suite
3. Create web dashboard
4. Expand media capabilities
5. Add analytics and monitoring

## Development Guidelines

### Code Standards

- Use ES modules consistently
- Follow kebab-case for file names
- Implement proper JSDoc comments
- Use async/await for asynchronous operations
- Validate all inputs and handle errors gracefully

### Testing

- Add unit tests for helpers and utilities
- Integration tests for commands
- API endpoint testing
- End-to-end testing for critical flows

### Deployment

- Use PM2 or similar for process management
- Implement health checks
- Add monitoring and alerting
- Use environment-specific configurations

## Conclusion

Scrambled has a solid foundation with good integration potential. Focusing on tightening the existing codebase first will provide a stable platform for future expansions. The modular architecture makes it easy to add new features incrementally while maintaining code quality.</content>
<parameter name="filePath">/Users/home/Documents/Projects/ecma/scrambled/.docs/bot.md
