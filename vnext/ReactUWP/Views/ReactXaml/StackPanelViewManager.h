// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#pragma once

#include <Views/FrameworkElementViewManager.h>

namespace react {
namespace uwp {

class StackPanelViewManager : public FrameworkElementViewManager {
  using Super = FrameworkElementViewManager;

 public:
  StackPanelViewManager(const std::shared_ptr<IReactInstance> &reactInstance);

  const char *GetName() const override;
  folly::dynamic GetNativeProps() const override;
  void UpdateProperties(
      ShadowNodeBase *nodeToUpdate,
      const folly::dynamic &reactDiffMap) override;

  void AddView(XamlView parent, XamlView child, int64_t index) override;
  void RemoveAllChildren(XamlView parent) override;
  void RemoveChildAt(XamlView parent, int64_t index) override;

 protected:
  XamlView CreateViewCore(int64_t tag) override;
};

} // namespace uwp
} // namespace react
