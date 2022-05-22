export interface IAddPackage {
    category: string;
    dependencies: string;
    description: string;
    display_name: string;
    image_url: string;
    installation_time: number;
    is_already_installed: boolean;
    is_visible: boolean;
    license_message: string;
    need_to_restart: string;
    package_name: string;
    publish_date: string;
    requires_license: boolean;
    summary: string;
    tags: string;
    weight: string;
}
