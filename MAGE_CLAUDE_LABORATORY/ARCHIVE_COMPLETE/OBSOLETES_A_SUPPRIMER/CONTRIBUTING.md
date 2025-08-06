# Contributing to Magic Stack

Thank you for your interest in contributing to the Magic Stack! 

## 🤝 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Remember: we're building magic together

## 🚀 Getting Started

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/magic-stack.git
   cd magic-stack
   ```
3. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Process

### 1. Make Changes
- Follow existing code style
- Add tests for new features
- Update documentation
- Keep commits atomic and clear

### 2. Test Your Changes
```bash
cd backends/java
mvn test          # Run tests
mvn verify        # Full verification
```

### 3. Commit Guidelines
- Use clear, descriptive commit messages
- Format: `type: description`
- Types: `feat`, `fix`, `docs`, `test`, `refactor`

Examples:
```
feat: add new spell formula for time manipulation
fix: correct 6D coordinate calculation
docs: update API reference for interstice endpoints
```

### 4. Submit Pull Request
- Push to your fork
- Create PR against `main` branch
- Fill out PR template
- Wait for review

## 🏗️ Architecture Guidelines

### Adding New Features

1. **New Magic Formula**
   - Add to formula list
   - Implement in `MagicEngineService`
   - Add tests
   - Document effects

2. **New API Endpoint**
   - Create controller method
   - Add service logic
   - Define DTOs
   - Update API docs

3. **Database Changes**
   - Create Liquibase changelog
   - Test migrations
   - Document schema changes

## 📝 Documentation

- Keep README.md updated
- Document new APIs
- Add code comments for complex logic
- Update examples

## 🧪 Testing Requirements

- Unit tests for services
- Integration tests for controllers
- Minimum 80% code coverage
- All tests must pass

## 🎨 Code Style

### Java
- Use Spring conventions
- Meaningful variable names
- Maximum method length: 30 lines
- Use dependency injection

### General
- No commented-out code
- No debug prints in production
- Handle errors gracefully
- Log important operations

## 🐛 Reporting Issues

Use GitHub Issues with:
- Clear title
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

## 💡 Feature Requests

We welcome new ideas! Please:
- Check existing issues first
- Explain use case
- Provide examples
- Be open to feedback

## 🎯 Priority Areas

Current focus areas:
- Performance optimization
- WebSocket real-time updates
- Additional visualization tools
- More magic formulas
- Better error handling

## 📜 License

By contributing, you agree that your contributions will be licensed under the Honor License.

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Part of the Magic Stack legacy

## Questions?

- Check existing documentation
- Ask in GitHub Discussions
- Contact maintainers

---

*Maintained by URZ-KÔM, Guardian of the Magic Stack*