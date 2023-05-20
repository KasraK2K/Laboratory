export const createResponse = {
  status: 201,
  description: 'Successfully created.',
  schema: {
    example: {
      id_number: '0534893570',
      email: 'Kasra.Karami.KK@yahoo.com',
      contact_number: '09183619290',
      archive_at: null,
      id: 1,
      first_name: 'Kasra',
      surname: 'Karami',
      is_blocked: false,
      permission: 0,
      created_at: '2023-05-19T16:28:13.576Z',
      updated_at: '2023-05-19T16:28:13.576Z'
    },
    properties: {
      id_number: { type: 'string', description: 'User ID number' },
      email: { type: 'string', description: 'User email address' },
      contact_number: { type: 'string', description: 'User contact number' },
      archive_at: { type: 'string', nullable: true, description: 'Archive timestamp' },
      id: { type: 'integer', description: 'User ID' },
      first_name: { type: 'string', description: 'User first name' },
      surname: { type: 'string', description: 'User surname' },
      is_blocked: { type: 'boolean', description: 'User block status' },
      permission: { type: 'integer', description: 'User permission level (zero for normal and one for vip)' },
      created_at: { type: 'string', format: 'date-time', description: 'User creation timestamp' },
      updated_at: { type: 'string', format: 'date-time', description: 'User last update timestamp' }
    }
  }
}
