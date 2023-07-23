module Api
  module Versioning
    extend ActiveSupport::Concern
    include Rails.application.routes.url_helpers

    def versioned_class(class_or_name, namespace_to_use = api_namespace)
      self.class.versioned_class(class_or_name, namespace_to_use)
    end

    def versioned_url_for(resource_name, *options)
      opts = options.last
      action = opts[:action] if opts.kind_of?(Hash)
      url_helper = _cached_api_base + resource_name.to_s
      url_helper << '_path'
      if action
        url_helper.prepend('_') if action
        url_helper.prepend(action.to_s) if action
      end
      send(url_helper, *options).sub('/api/v1', '')
    end

    def api_namespace
      self.class.api_namespace
    end

    def _cached_api_base
      @__cached_api_base ||= "#{api_namespace.gsub('::', '').underscore}_v1_"
    end

    module ClassMethods
      def api_namespace
        name.deconstantize.split('::').take(2).join('::')
      end

      def versioned_class(class_or_name, namespace_to_use = api_namespace)
        class_name = class_or_name.respond_to?(:name) ? class_or_name.name : class_or_name
        class_name = class_name.demodulize

        "#{namespace_to_use}::#{class_name}".constantize
      end
    end
  end
end
