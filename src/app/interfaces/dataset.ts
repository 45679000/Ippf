export interface Dataset {
    author: string
    author_email: string
    creator_user_id: string
    extras: Array<string>
    groups: Array<string>
    id: string
    isopen: boolean
    license_id: string
    license_title: string
    maintainer: string
    maintainer_email: string
    metadata_created: string
    metadata_modified: string
    name: string
    notes: string
    num_resources: number
    num_tags: number
    organization: object
    owner_org: string
    private: boolean
    relationships_as_object: Array<string>
    relationships_as_subject: Array<string>
    resources: Array<string>,
    state: string
    tags: object
    title: string
    type: string
    url: string
    version: string

}
