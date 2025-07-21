# Postman Collection - User Class Management API

This directory contains Postman collection and environment files for testing the User Class Management API endpoints.

## Files Included

### 📂 Collection File
- **`User-Class-Management-API.postman_collection.json`**
  - Complete API collection with all endpoints
  - Comprehensive documentation for each endpoint
  - Example requests and responses
  - Business rule validation examples
  - Error handling scenarios

### 🌍 Environment File
- **`Local-Development.postman_environment.json`**
  - Environment variables for local development
  - Default values for testing
  - Dynamic variables for batch operations

## 🚀 Quick Setup

### 1. Import Collection
1. Open Postman
2. Click **Import** button
3. Select `User-Class-Management-API.postman_collection.json`
4. Collection will appear in your workspace

### 2. Import Environment
1. Click **Import** button again
2. Select `Local-Development.postman_environment.json`
3. Select **"Local Development"** environment from dropdown

### 3. Start the Application
```bash
# Make sure your NestJS application is running
npm run start:dev
# or
nest start

# Application should be available at http://localhost:3000
```

## 📋 API Endpoints Overview

### 👥 User Management
- `GET /users` - Get all users (with optional role filtering)
- `GET /users/:id` - Get specific user
- `POST /users` - Create new user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### 🏫 Class Management
- `GET /classes` - Get all classes
- `GET /classes/:id` - Get specific class
- `POST /classes` - Create new class
- `PATCH /classes/:id` - Update class
- `DELETE /classes/:id` - Delete class

### 🔗 User-Class Assignments
- `POST /classes/assignments` - Assign user to class
- `DELETE /classes/assignments/users/:userId/classes/:classId` - Unassign user
- `GET /classes/assignments/users/:userId` - Get user's assignments
- `GET /classes/:classId/assignments` - Get class assignments
- `POST /classes/assignments/batch` - Batch assign users (async, returns 202)

### 🧹 Batch Job Management
- `GET /classes/assignments/batch` - Get all batch jobs
- `GET /classes/assignments/batch/:batchId/status` - Get batch job status
- `DELETE /classes/assignments/batch/clear` - Clear completed batch jobs (COMPLETED, FAILED, PARTIAL_SUCCESS)
- `DELETE /classes/assignments/batch/clear/old` - Clear old batch jobs (24+ hours old)
- `DELETE /classes/assignments/batch/clear/all` - Clear ALL batch jobs (⚠️ Development only)

## 🔧 Environment Variables

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `baseUrl` | `http://localhost:3000` | API base URL |
| `userId` | `1` | Default user ID for testing |
| `classId` | `1` | Default class ID for testing |
| `adminUserId` | `2` | Admin user for role-based testing |
| `engineerUserId` | `3` | Engineer user for testing |
| `internUserId` | `5` | Intern user for testing |
| `testClassName` | `Advanced NestJS Development` | Default class name |
| `testClassCapacity` | `25` | Default class capacity |
| `batchCorrelationId` | `batch_{{$timestamp}}` | Dynamic batch tracking ID |

## 📖 Testing Scenarios

### Basic Flow
1. **Get All Users** - See existing users
2. **Create Class** - Create a test class
3. **Assign User to Class** - Test assignment logic
4. **Get Class Assignments** - Verify assignment
5. **Batch Operations** - Test bulk assignments

### Business Rule Testing
1. **Capacity Limits** - Try assigning more users than class capacity
2. **Duplicate Prevention** - Try assigning same user twice
3. **Class Deletion** - Try deleting class with active assignments
4. **Role Filtering** - Test role-based user filtering
5. **Batch Size Limits** - Test batch operations with large datasets

### Batch Job Management Testing
1. **Create Batch Jobs** - Submit batch assignments to create jobs
2. **Monitor Job Status** - Check job progress and completion
3. **Clear Completed Jobs** - Use `/clear` to remove finished jobs
4. **Clear Old Jobs** - Use `/clear/old` for 24+ hour old jobs  
5. **Development Reset** - Use `/clear/all` to reset all jobs (⚠️ caution)

### Error Scenarios
- Invalid user/class IDs (404 errors)
- Capacity violations (400 errors)
- Duplicate assignments (400 errors)
- Invalid data formats (validation errors)

## 🧪 Testing Tips

### Using Dynamic Variables
The collection includes Postman dynamic variables:
- `{{$randomFullName}}` - Random user names
- `{{$randomEmail}}` - Random email addresses
- `{{$randomInt}}` - Random numbers for capacity
- `{{$timestamp}}` - Current timestamp for batch IDs

### Pre-request Scripts
The collection includes scripts that:
- Set default values for common variables
- Generate correlation IDs for batch operations

### Test Scripts
Automatic tests for:
- Response time validation (< 1000ms)
- Content-Type verification
- Basic response structure validation

## 🚨 Common Issues & Solutions

### 1. Connection Refused
**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:3000`
**Solution**: Make sure NestJS application is running on port 3000

### 2. 404 Not Found
**Problem**: Endpoint not found
**Solution**: Verify the correct endpoint path and HTTP method

### 3. Validation Errors
**Problem**: 400 Bad Request with validation messages
**Solution**: Check request body format and required fields

### 4. Business Rule Violations
**Problem**: Class capacity or assignment rules violated
**Solution**: Review business rules in collection documentation

## 📈 Advanced Testing

### Performance Testing
- Use Postman Runner for load testing
- Test batch endpoints with varying sizes
- Monitor response times across different operations

### Data Persistence Testing
- Create users and classes
- Test assignment relationships
- Verify data consistency across operations

### Edge Case Testing
- Empty request bodies
- Invalid data types
- Boundary values (capacity limits, batch sizes)
- Special characters in names and descriptions

---

## 🔄 Next Steps

This collection is ready for:
1. **Phase 1**: Database integration testing (Prisma + PostgreSQL)
2. **Phase 3**: Redis async processing validation
3. **Phase 4**: Authentication testing with JWT tokens
4. **Automated Testing**: CI/CD pipeline integration

Happy testing! 🎉 